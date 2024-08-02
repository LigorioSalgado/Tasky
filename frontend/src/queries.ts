import { gql } from "@apollo/client"

export const PROJECTS_QUERY = gql`

{
  projects{
    id,
    name,
    description
  }
}
`

export const PROJECT_CREATE = gql`

    mutation CreateNewProject($name:String!, $description:String){
        createProject(name:$name, description:$description){
            project{
            id
        }
    }
 }

`

export const  UPDATE_PROJECT = gql`
  mutation UpdateProject($id:String!, $name:String, $description:String){
        updateProject(id:$id, name:$name, description:$description){
            project{
            id
            name
        }
    }
 }


`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) {
      success
    }
  }
`;

export const PROJECT_GET = gql`
  query getProject($id:String!){
    project(id:$id){
      id,
      name,
      columns{
        id
        name
        tasks{
          id
          title
          tags
        }
      }
    }
  }


`


export const CREATE_COLUMN = gql`
  mutation CreateColumn($name: String!, $order: Int!, $projectId: String!) {
    createColumn(name: $name, order: $order, projectId: $projectId) {
      column {
        id
        projectId
        name
        order
      }
    }
  }
`;

export const UPDATE_COLUMN = gql`
  mutation UpdateColumn($id: String!, $name: String, $order: Int, $projectId: String!) {
    updateColumn(id: $id, name: $name, order: $order, projectId: $projectId) {
      column {
        id
        projectId
        name
        order

      }
    }
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($id: String!, $projectId: String!) {
    deleteColumn(id: $id, projectId: $projectId) {
      success
      message
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($columnId: String!, $title: String!, $description: String, $endDate: String, $priority: PRIORITIES, $startDate: String, $tags: [String]) {
    createTask(columnId: $columnId, title: $title, description: $description, endDate: $endDate, priority: $priority, startDate: $startDate, tags: $tags) {
      task {
        id
        columnId
        title
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $columnId: String!, $title: String, $description: String, $endDate: String, $priority: PRIORITIES, $startDate: String, $tags: [String]) {
    updateTask(id: $id, columnId: $columnId, title: $title, description: $description, endDate: $endDate, priority: $priority, startDate: $startDate, tags: $tags) {
      task {
        id
        columnId
      }
    }
  }
`;

// Delete Task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!, $columnId: String!) {
    deleteTask(id: $id, columnId: $columnId) {
      success
      message
    }
  }
`;
