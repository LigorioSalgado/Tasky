import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ColumnType = {
  __typename?: 'ColumnType';
  createDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  projectId?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Maybe<TaskType>>>;
  updateDate?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateColumn = {
  __typename?: 'CreateColumn';
  column?: Maybe<ColumnType>;
};

export type CreateProject = {
  __typename?: 'CreateProject';
  project?: Maybe<ProjectType>;
};

export type CreateTask = {
  __typename?: 'CreateTask';
  task?: Maybe<TaskType>;
};

export type DeleteColumn = {
  __typename?: 'DeleteColumn';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteProject = {
  __typename?: 'DeleteProject';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteTask = {
  __typename?: 'DeleteTask';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MoveTask = {
  __typename?: 'MoveTask';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  task?: Maybe<TaskType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createColumn?: Maybe<CreateColumn>;
  createProject?: Maybe<CreateProject>;
  createTask?: Maybe<CreateTask>;
  deleteColumn?: Maybe<DeleteColumn>;
  deleteProject?: Maybe<DeleteProject>;
  deleteTask?: Maybe<DeleteTask>;
  moveTask?: Maybe<MoveTask>;
  updateColumn?: Maybe<UpdateColumn>;
  updateProject?: Maybe<UpdateProject>;
  updateTask?: Maybe<UpdateTask>;
};


export type MutationCreateColumnArgs = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTaskArgs = {
  columnId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Priorities>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};


export type MutationDeleteColumnArgs = {
  id: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  columnId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationMoveTaskArgs = {
  sourceColumnId: Scalars['String']['input'];
  targetColumnId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};


export type MutationUpdateColumnArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  columnId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  priority?: InputMaybe<Priorities>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum Priorities {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export type ProjectType = {
  __typename?: 'ProjectType';
  columns?: Maybe<Array<Maybe<ColumnType>>>;
  createDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updateDate?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<ProjectType>;
  projects?: Maybe<Array<Maybe<ProjectType>>>;
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};

export type TaskType = {
  __typename?: 'TaskType';
  columnId?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Priorities>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
  updateDate?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateColumn = {
  __typename?: 'UpdateColumn';
  column?: Maybe<ColumnType>;
};

export type UpdateProject = {
  __typename?: 'UpdateProject';
  project?: Maybe<ProjectType>;
};

export type UpdateTask = {
  __typename?: 'UpdateTask';
  task?: Maybe<TaskType>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ColumnType: ResolverTypeWrapper<ColumnType>;
  CreateColumn: ResolverTypeWrapper<CreateColumn>;
  CreateProject: ResolverTypeWrapper<CreateProject>;
  CreateTask: ResolverTypeWrapper<CreateTask>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteColumn: ResolverTypeWrapper<DeleteColumn>;
  DeleteProject: ResolverTypeWrapper<DeleteProject>;
  DeleteTask: ResolverTypeWrapper<DeleteTask>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MoveTask: ResolverTypeWrapper<MoveTask>;
  Mutation: ResolverTypeWrapper<{}>;
  PRIORITIES: Priorities;
  ProjectType: ResolverTypeWrapper<ProjectType>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TaskType: ResolverTypeWrapper<TaskType>;
  UpdateColumn: ResolverTypeWrapper<UpdateColumn>;
  UpdateProject: ResolverTypeWrapper<UpdateProject>;
  UpdateTask: ResolverTypeWrapper<UpdateTask>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ColumnType: ColumnType;
  CreateColumn: CreateColumn;
  CreateProject: CreateProject;
  CreateTask: CreateTask;
  DateTime: Scalars['DateTime']['output'];
  DeleteColumn: DeleteColumn;
  DeleteProject: DeleteProject;
  DeleteTask: DeleteTask;
  Int: Scalars['Int']['output'];
  MoveTask: MoveTask;
  Mutation: {};
  ProjectType: ProjectType;
  Query: {};
  String: Scalars['String']['output'];
  TaskType: TaskType;
  UpdateColumn: UpdateColumn;
  UpdateProject: UpdateProject;
  UpdateTask: UpdateTask;
};

export type ColumnTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ColumnType'] = ResolversParentTypes['ColumnType']> = {
  createDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskType']>>>, ParentType, ContextType>;
  updateDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateColumn'] = ResolversParentTypes['CreateColumn']> = {
  column?: Resolver<Maybe<ResolversTypes['ColumnType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateProject'] = ResolversParentTypes['CreateProject']> = {
  project?: Resolver<Maybe<ResolversTypes['ProjectType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTask'] = ResolversParentTypes['CreateTask']> = {
  task?: Resolver<Maybe<ResolversTypes['TaskType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteColumn'] = ResolversParentTypes['DeleteColumn']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteProject'] = ResolversParentTypes['DeleteProject']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteTask'] = ResolversParentTypes['DeleteTask']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveTask'] = ResolversParentTypes['MoveTask']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['TaskType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createColumn?: Resolver<Maybe<ResolversTypes['CreateColumn']>, ParentType, ContextType, RequireFields<MutationCreateColumnArgs, 'name' | 'order' | 'projectId'>>;
  createProject?: Resolver<Maybe<ResolversTypes['CreateProject']>, ParentType, ContextType, Partial<MutationCreateProjectArgs>>;
  createTask?: Resolver<Maybe<ResolversTypes['CreateTask']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'columnId' | 'title'>>;
  deleteColumn?: Resolver<Maybe<ResolversTypes['DeleteColumn']>, ParentType, ContextType, RequireFields<MutationDeleteColumnArgs, 'id' | 'projectId'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['DeleteProject']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['DeleteTask']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'columnId' | 'id'>>;
  moveTask?: Resolver<Maybe<ResolversTypes['MoveTask']>, ParentType, ContextType, RequireFields<MutationMoveTaskArgs, 'sourceColumnId' | 'targetColumnId' | 'taskId'>>;
  updateColumn?: Resolver<Maybe<ResolversTypes['UpdateColumn']>, ParentType, ContextType, RequireFields<MutationUpdateColumnArgs, 'id' | 'projectId'>>;
  updateProject?: Resolver<Maybe<ResolversTypes['UpdateProject']>, ParentType, ContextType, Partial<MutationUpdateProjectArgs>>;
  updateTask?: Resolver<Maybe<ResolversTypes['UpdateTask']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'columnId' | 'id'>>;
};

export type ProjectTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectType'] = ResolversParentTypes['ProjectType']> = {
  columns?: Resolver<Maybe<Array<Maybe<ResolversTypes['ColumnType']>>>, ParentType, ContextType>;
  createDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  project?: Resolver<Maybe<ResolversTypes['ProjectType']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectType']>>>, ParentType, ContextType>;
};

export type TaskTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskType'] = ResolversParentTypes['TaskType']> = {
  columnId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['PRIORITIES']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateColumn'] = ResolversParentTypes['UpdateColumn']> = {
  column?: Resolver<Maybe<ResolversTypes['ColumnType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateProject'] = ResolversParentTypes['UpdateProject']> = {
  project?: Resolver<Maybe<ResolversTypes['ProjectType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateTask'] = ResolversParentTypes['UpdateTask']> = {
  task?: Resolver<Maybe<ResolversTypes['TaskType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ColumnType?: ColumnTypeResolvers<ContextType>;
  CreateColumn?: CreateColumnResolvers<ContextType>;
  CreateProject?: CreateProjectResolvers<ContextType>;
  CreateTask?: CreateTaskResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteColumn?: DeleteColumnResolvers<ContextType>;
  DeleteProject?: DeleteProjectResolvers<ContextType>;
  DeleteTask?: DeleteTaskResolvers<ContextType>;
  MoveTask?: MoveTaskResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProjectType?: ProjectTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TaskType?: TaskTypeResolvers<ContextType>;
  UpdateColumn?: UpdateColumnResolvers<ContextType>;
  UpdateProject?: UpdateProjectResolvers<ContextType>;
  UpdateTask?: UpdateTaskResolvers<ContextType>;
};

