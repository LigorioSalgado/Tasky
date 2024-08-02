from models.ProjectModel import Project, Column, Task


def create_tables():
    if not Project.exists():
        Project.create_table(
            read_capacity_units=1, 
            write_capacity_units=1, 
            wait=True
        )
        print("Table Projects was created")

if __name__ == "__main__":
    create_tables()
