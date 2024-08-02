from uuid import uuid4
from  enum import Enum
import graphene
from graphene import ObjectType, String, List, Field, Int, Boolean
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
    start_date = String()
    end_date = String()
    tags = List(String)
    create_date = DateTime()
    update_date = DateTime()
    
    def resolve_id(self,info):
        _,id  = self.SK.split("#")
        return id
    def resolve_priority(self, info):
        print(self.priority)
        return PRIORITIES(int(self.priority)).name
    
    def resolve_column_id(self,info):
         _,id  = self.PK.split("#")
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
        columns = list(Column.query(self.PK, Column.SK.startswith("COLUMN#")))
        sorted_columns = sorted(columns, key=lambda x: x.order)
        return sorted_columns


class Query(ObjectType):
    projects = List(ProjectType)
    project = Field(ProjectType, id=String(required=True))

    def resolve_projects(self,info):
        projects = Project.scan(Project.SK.startswith('METADATA#'))
        return list(projects)

    def resolve_project(self,info, id):
        print(id)
        project = Project.get(f'PROJECT#{id}', f'METADATA#{id}')
        return project


class CreateProject(graphene.Mutation):
    class Arguments:
        name = String()
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


class UpdateProject(graphene.Mutation):
    class Arguments:
        id = String()
        name = String()
        description = String()

    project = Field(lambda: ProjectType)

    def mutate(root, info, id, name, description):
        project = Project.get(f'PROJECT#{id}', f'METADATA#{id}')
        actions = []
        if name:
            actions.append(Project.name.set(name))
        if description:
            actions.append(Project.description.set(description))
        
        project.update(actions=actions)
        return UpdateProject(project=project)

class DeleteProject(graphene.Mutation):
    class Arguments:
        id = String(required=True)

    success = Boolean()

    message = String()

    def mutate(self, info, id):
        try:
            columns = Column.query(f"PROJECT#{id}", Column.SK.startswith("COLUMN#"))
            for column in columns:
                tasks = Task.query(f"COLUMN#{column.SK}", Task.SK.startswith("TASK#"))
                for task in tasks:
                    task.delete()
                column.delete()            
            project = Project.get(f"PROJECT#{id}", f"METADATA#{id}")
            project.delete()
            return DeleteProject(success=True, message=f"Project {id} deleted")
        except Project.DoesNotExist:
            return DeleteProject(success=False, message=f"Project {id} does not exists.")
        
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
    

class UpdateColumn(graphene.Mutation):
    class Arguments:
        id = String(required=True)
        project_id = String(required=True)
        name = String()
        order = Int()

    column = Field(lambda: ColumnType)

    def mutate(self, info, id, project_id, name=None, order=None):
        try:
            column = Column.get(f"PROJECT#{project_id}", f"COLUMN#{id}")
            actions = []
            if name:
                actions.append(Column.name.set(name))
            if order is not None:
                actions.append(Column.order.set(order))
            
            if actions:
                column.update(actions=actions)
            
            return UpdateColumn(column=column)
        except Column.DoesNotExist:
            raise Exception(f"Column {id} does not exist.")

class DeleteColumn(graphene.Mutation):
    class Arguments:
        id = String(required=True)
        project_id = String(required=True)

    success = Boolean()
    message = String()

    def mutate(self, info, id, project_id):
        try:
            column = Column.get(f"PROJECT#{project_id}", f"COLUMN#{id}")
            tasks = Task.query(f"COLUMN#{id}", Task.SK.startswith("TASK#"))
            for task in tasks:
                task.delete()
            column.delete()
            return DeleteColumn(success=True, message=f"Column {id} deleted successfully.")
        except Column.DoesNotExist:
            return DeleteColumn(success=False, message=f"Column {id} does not exist.")
class UpdateTask(graphene.Mutation):
    class Arguments:
        id = String(required=True)
        column_id = String(required=True)
        title = String()
        description = String()
        priority = PrioritiesEnum()
        start_date = String()
        end_date = String()
        tags = List(String)

    task = Field(lambda: TaskType)

    def mutate(self, info, id, column_id, title=None, description=None, priority="LOW", start_date=None, end_date=None, tags=None):
        try:
            task = Task.get(f"COLUMN#{column_id}", f"TASK#{id}")
            actions = []
            if title:
                actions.append(Task.title.set(title))
            if description:
                actions.append(Task.description.set(description))
            if priority:
                actions.append(Task.priority.set(priority.value))
            if start_date:
                actions.append(Task.start_date.set(start_date))
            if end_date:
                actions.append(Task.end_date.set(end_date))
            if tags is not None:
                actions.append(Task.tags.set(tags))
            
            if actions:
                task.update(actions=actions)
            
            return UpdateTask(task=task)
        except Task.DoesNotExist:
            raise Exception(f"Task {id} does not exist.")

class MoveTask(graphene.Mutation):
    class Arguments:
        task_id = String(required=True)
        source_column_id = String(required=True)
        target_column_id = String(required=True)

    success = Boolean()
    message = String()
    task = Field(lambda: TaskType)

    def mutate(self, info, task_id, source_column_id, target_column_id):
        try:
            task = Task.get(f"COLUMN#{source_column_id}", f"TASK#{task_id}")
            
            new_task = Task(
                PK=f"COLUMN#{target_column_id}",
                SK=task.SK,
                title=task.title,
                description=task.description,
                priority=task.priority,
                start_date=task.start_date,
                end_date=task.end_date,
                tags=task.tags,
                create_date=task.create_date,
                update_date=task.update_date
            )
            new_task.save()

            task.delete()
            
            return MoveTask(success=True, message=f"Task {task_id} moved successfully.", task=new_task)
        except Task.DoesNotExist:
            return MoveTask(success=False, message=f"Task {task_id} does not exist.")
        
class DeleteTask(graphene.Mutation):
    class Arguments:
        id = String(required=True)
        column_id = String(required=True)

    success = Boolean()
    message = String()

    def mutate(self, info, id, column_id):
        try:
            task = Task.get(f"COLUMN#{column_id}", f"TASK#{id}")
            task.delete()
            return DeleteTask(success=True, message=f"Task {id} deleted successfully.")
        except Task.DoesNotExist:
            return DeleteTask(success=False, message=f"Task {id} does not exist.")            

class CreateTask(graphene.Mutation):
    class Arguments:
        column_id = String(required=True)
        title = String(required=True)
        description = String()
        priority = PrioritiesEnum()
        start_date = String()
        end_date = String()
        tags = List(String)
    
    task = Field(lambda: TaskType)

    def mutate(self, info, column_id, title, priority="LOW", description=None, start_date=None, end_date=None, tags=None):
            id = uuid4()
            task = Task(
                PK=f"COLUMN#{column_id}",
                SK=f"TASK#{id}",
                title=title,
                description=description,
                priority=priority.value,
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
    update_project = UpdateProject.Field()
    delete_project = DeleteProject.Field()
    update_column = UpdateColumn.Field()
    delete_column = DeleteColumn.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()
    move_task = MoveTask.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
    

