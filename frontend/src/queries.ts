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