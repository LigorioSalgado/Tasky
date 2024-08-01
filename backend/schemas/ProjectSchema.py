from uuid import uuid4
from  enum import Enum
import graphene
from graphene import ObjectType, String, List, Field, Int
from graphene.types.uuid import UUID
from graphene.types.datetime import DateTime
from models.ProjectModel import Project, Column, Task


PRIORITIES = Enum('PRIORITIES', ['LOW', 'MEDIUM', 'HIGH', 'URGENT'])

PrioritiesEnum = graphene.Enum.from_enum(PRIORITIES)

class TaskType(ObjectType):
    id = String()
    column_id = String()
    title = String()
    priority = PrioritiesEnum()
    description = String()
    start_date = DateTime()
    end_date = DateTime()
    tags = List(String)
    create_date = DateTime()
    update_date = DateTime()
    
    def resolve_id(self,info):
        _,id  = self.SK.split("#")
        return id

class ColumnType(ObjectType):
    id = String()
    project_id = String()
    name = String()
    order = Int()
    tasks = List(TaskType)
    create_date = DateTime()
    update_date = DateTime()

    def resolve_id(self,info):
        _,id  = self.SK.split("#")
        return id

    def resolve_tasks(self, info):
        print(list(Task.scan(Task.SK.startswith("TASK#"))))
        return list(Task.query(self.SK, Task.SK.startswith("TASK#")))




class ProjectType(ObjectType):
    id = String()
    name = String()
    description = String()
    columns = List(ColumnType)
    create_date = DateTime()
    update_date = DateTime()

    def resolve_id(parent,info):
        _,id  = parent.SK.split("#")
        return id

    def resolve_columns(self, info):
        
        return list(Column.query(self.PK, Column.SK.startswith("COLUMN#")))



class Query(ObjectType):
    projects = List(ProjectType)
    project = Field(ProjectType, id=String(required=True))

    def resolve_projects(self,info):
        projects = Project.scan(Project.PK.startswith('PROJECT#'))
        return list(projects)

    def resolve_project(self,info, id):
        project = Project.get(f'PROJECT#{id}', f'METADATA#{id}')
        return project
    
class CreateProject(graphene.Mutation):
    class Arguments:
        name = String(required = True)
        description = String()

    project = Field(lambda: ProjectType)

    def mutate(root, info, name, description=""):
        id = uuid4()
        project = Project(
            PK=f"PROJECT#{id}",
            SK=f"METADATA#{id}",
            name=name,
            description=description
        )

        project.save()

        return CreateProject(project=project)

class CreateColumn(graphene.Mutation):
    class Arguments:
        project_id = String(required=True)
        name = String(required=True)
        order = Int(required=True)
    
    column = Field(lambda: ColumnType)

    def mutate(self, info, project_id, name, order):
        id = uuid4()
        column = Column(
            PK=f"PROJECT#{project_id}",
            SK=f"COLUMN#{id}",
            name = name,
            order = order
        )
        column.save()
        return CreateColumn(column=column)
    

class CreateTask(graphene.Mutation):
    class Arguments:
        column_id = String(required=True)
        title = String(required=True)
        description = String()
        priority = PrioritiesEnum()
        start_date = DateTime()
        end_date = DateTime()
        tags = List(String)
    
    task = Field(lambda: TaskType)


    def mutate(self, info, column_id, title, priority="LOW", description=None, start_date=None, end_date=None, tags=None):
            id = uuid4()
            task = Task(
                PK=f"COLUMN#{column_id}",
                SK=f"TASK#{id}",
                title=title,
                description=description,
                priority=priority,
                start_date=start_date,
                end_date=end_date,
                tags=tags
            )
            task.save()
            return CreateTask(task=task)

class Mutation(ObjectType):
    create_project = CreateProject.Field()
    create_column = CreateColumn.Field()
    create_task = CreateTask.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
    

