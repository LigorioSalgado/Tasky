import pytest
import graphene
from graphene.test import Client
from uuid import uuid4
from models.ProjectModel import Project, Column, Task
from ..ProjectSchema import schema, Mutation, Query

def setup_module(module):
    project_id = str(uuid4())
    Project(
        PK=f"PROJECT#{project_id}",
        SK=f"METADATA#{project_id}",
        name="Test Project",
        description="Test Description"
    ).save()

    column_id = str(uuid4())
    Column(
        PK=f"PROJECT#{project_id}",
        SK=f"COLUMN#{column_id}",
        name="Test Column",
        order=1
    ).save()

    task_id = str(uuid4())
    Task(
        PK=f"COLUMN#{column_id}",
        SK=f"TASK#{task_id}",
        title="Test Task",
        description="Test Description",
        priority="LOW",
        start_date="2022-01-01",
        end_date="2022-12-31",
        tags=["test"]
    ).save()

    module.project_id = project_id
    module.column_id = column_id
    module.task_id = task_id

def teardown_module(module):
    Project.delete(f"PROJECT#{module.project_id}", f"METADATA#{module.project_id}")
    Column.delete(f"PROJECT#{module.project_id}", f"COLUMN#{module.column_id}")
    Task.delete(f"COLUMN#{module.column_id}", f"TASK#{module.task_id}")

client = Client(schema)

def test_create_project():
    mutation = '''
        mutation {
            createProject(name: "New Project", description: "New Description") {
                project {
                    id
                    name
                    description
                }
            }
        }
    '''
    executed = client.execute(mutation)
    assert executed["data"]["createProject"]["project"]["name"] == "New Project"
    assert executed["data"]["createProject"]["project"]["description"] == "New Description"

def test_update_project():
    mutation = f'''
        mutation {{
            updateProject(id: "{project_id}", name: "Updated Project", description: "Updated Description") {{
                project {{
                    id
                    name
                    description
                }}
            }}
        }}
    '''
    executed = client.execute(mutation)
    assert executed["data"]["updateProject"]["project"]["name"] == "Updated Project"
    assert executed["data"]["updateProject"]["project"]["description"] == "Updated Description"

def test_delete_project():
    mutation = f'''
        mutation {{
            deleteProject(id: "{project_id}") {{
                success
                message
            }}
        }}
    '''
    executed = client.execute(mutation)
    assert executed["data"]["deleteProject"]["success"] == True
    assert "deleted" in executed["data"]["deleteProject"]["message"]

def test_move_task():
    new_column_id = str(uuid4())
    Column(
        PK=f"PROJECT#{project_id}",
        SK=f"COLUMN#{new_column_id}",
        name="New Column",
        order=2
    ).save()

    mutation = f'''
        mutation {{
            moveTask(task_id: "{task_id}", source_column_id: "{column_id}", target_column_id: "{new_column_id}") {{
                success
                message
                task {{
                    id
                    column_id
                    title
                }}
            }}
        }}
    '''
    executed = client.execute(mutation)
    assert executed["data"]["moveTask"]["success"] == True
    assert executed["data"]["moveTask"]["task"]["column_id"] == new_column_id

    # Clean up
    Column.delete(f"PROJECT#{project_id}", f"COLUMN#{new_column_id}")

def test_update_task():
    mutation = f'''
        mutation {{
            updateTask(id: "{task_id}", column_id: "{column_id}", title: "Updated Task", description: "Updated Description", priority: HIGH) {{
                task {{
                    id
                    title
                    description
                    priority
                }}
            }}
        }}
    '''
    executed = client.execute(mutation)
    assert executed["data"]["updateTask"]["task"]["title"] == "Updated Task"
    assert executed["data"]["updateTask"]["task"]["description"] == "Updated Description"
    assert executed["data"]["updateTask"]["task"]["priority"] == "HIGH"

def test_delete_task():
    mutation = f'''
        mutation {{
            deleteTask(id: "{task_id}", column_id: "{column_id}") {{
                success
                message
            }}
        }}
    '''
    executed = client.execute(mutation)
    assert executed["data"]["deleteTask"]["success"] == True
    assert "deleted" in executed["data"]["deleteTask"]["message"]
