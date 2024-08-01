from models.ProjectModel import Project, Column, Task


def create_tables():
    if not Project.exists():
        Project.create_table(
            read_capacity_units=1, 
            write_capacity_units=1, 
            wait=True
        )
        print("Tabla 'Proyectos' creada exitosamente.")
    else:
        print("La tabla 'Proyectos' ya existe.")

    if not Column.exists():
        Column.create_table(
            read_capacity_units=1, 
            write_capacity_units=1, 
            wait=True
        )
        print("Tabla 'Columnas' creada exitosamente.")
    else:
        print("La tabla 'Columnas' ya existe.")

    if not Task.exists():
        Task.create_table(
            read_capacity_units=1, 
            write_capacity_units=1, 
            wait=True
        )
        print("Tabla 'Tareas' creada exitosamente.")
    else:
        print("La tabla 'Tareas' ya existe.")


if __name__ == "__main__":
    create_tables()
