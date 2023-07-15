/* eslint-disable */
//This Code is auto generated by graphql-codegen, DO NOT EDIT
//You can update the queries or mutations in *.graphql to generate any new changes.
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useAxios } from './axiosHelper';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: unknown;
  Map: Record<string, unknown>;
};

export type Mutation = {
  note: NoteMutation;
};

export type Note = {
  children?: Maybe<Array<Maybe<Note>>>;
  containerId?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['Map']>;
  id?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<NoteType>;
};

export type NoteInput = {
  containerId?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['Map']>;
  parentId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type NoteMutation = {
  changeParent?: Maybe<Note>;
  delete?: Maybe<Scalars['String']>;
  switchPublic?: Maybe<Scalars['String']>;
  upsertFolder?: Maybe<Note>;
  upsertNote?: Maybe<Note>;
};


export type NoteMutationChangeParentArgs = {
  id: Scalars['String'];
  parentId: Scalars['String'];
};


export type NoteMutationDeleteArgs = {
  id: Scalars['String'];
};


export type NoteMutationSwitchPublicArgs = {
  id: Scalars['String'];
};


export type NoteMutationUpsertFolderArgs = {
  containerId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type NoteMutationUpsertNoteArgs = {
  data: NoteInput;
  id?: InputMaybe<Scalars['String']>;
};

export type NoteQuery = {
  get?: Maybe<Note>;
  getFiles?: Maybe<Array<Maybe<Note>>>;
  listAll?: Maybe<Array<Maybe<Note>>>;
};


export type NoteQueryGetArgs = {
  id: Scalars['String'];
};


export type NoteQueryGetFilesArgs = {
  id: Scalars['String'];
};


export type NoteQueryListAllArgs = {
  containerId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export const NoteType = {
  File: 'FILE',
  Folder: 'FOLDER'
} as const;

export type NoteType = typeof NoteType[keyof typeof NoteType];
export type Query = {
  note: NoteQuery;
};

export type Subscription = {
  getNote: Note;
};


export type SubscriptionGetNoteArgs = {
  noteId: Scalars['String'];
  subscriberId: Scalars['String'];
};

export type AddNoteMutationVariables = Exact<{
  data: NoteInput;
}>;


export type AddNoteMutation = { note: { upsertNote?: { data?: Record<string, unknown> | null, title?: string | null, parentId?: string | null, id?: string | null, containerId?: string | null } | null } };

export type AddFolderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  containerId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
}>;


export type AddFolderMutation = { note: { upsertFolder?: { id?: string | null, containerId?: string | null, title?: string | null, data?: Record<string, unknown> | null, parentId?: string | null } | null } };

export type AddFilesMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  data: NoteInput;
}>;


export type AddFilesMutation = { note: { upsertNote?: { data?: Record<string, unknown> | null, id?: string | null, parentId?: string | null, title?: string | null, containerId?: string | null } | null } };

export type UpsertNoteMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  data: NoteInput;
}>;


export type UpsertNoteMutation = { note: { upsertNote?: { data?: Record<string, unknown> | null, title?: string | null, parentId?: string | null, id?: string | null, containerId?: string | null } | null } };

export type MakeNotePublicMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MakeNotePublicMutation = { note: { switchPublic?: string | null } };

export type GetNoteFolderStructureQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type GetNoteFolderStructureQuery = { note: { listAll?: Array<{ id?: string | null, title?: string | null, type?: NoteType | null, children?: Array<{ id?: string | null, title?: string | null, type?: NoteType | null } | null> | null } | null> | null } };

export type GetNoteQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNoteQuery = { note: { get?: { id?: string | null, title?: string | null, data?: Record<string, unknown> | null } | null } };

export type SubscribeNoteSubscriptionVariables = Exact<{
  noteId: Scalars['String'];
  subscriberId: Scalars['String'];
}>;


export type SubscribeNoteSubscription = { getNote: { containerId?: string | null, id?: string | null, parentId?: string | null, title?: string | null, data?: Record<string, unknown> | null } };


export const AddNoteDocument = `
    mutation addNote($data: NoteInput!) {
  note {
    upsertNote(data: $data) {
      data
      title
      parentId
      id
      containerId
    }
  }
}
    `;
export const useAddNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddNoteMutation, TError, AddNoteMutationVariables, TContext>) =>
    useMutation<AddNoteMutation, TError, AddNoteMutationVariables, TContext>(
      ['addNote'],
      useAxios<AddNoteMutation, AddNoteMutationVariables>(AddNoteDocument),
      options
    );
useAddNoteMutation.getKey = () => ['addNote'];

export const AddFolderDocument = `
    mutation addFolder($id: String, $containerId: String, $title: String!) {
  note {
    upsertFolder(title: $title, id: $id, containerId: $containerId) {
      id
      containerId
      title
      data
      parentId
    }
  }
}
    `;
export const useAddFolderMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddFolderMutation, TError, AddFolderMutationVariables, TContext>) =>
    useMutation<AddFolderMutation, TError, AddFolderMutationVariables, TContext>(
      ['addFolder'],
      useAxios<AddFolderMutation, AddFolderMutationVariables>(AddFolderDocument),
      options
    );
useAddFolderMutation.getKey = () => ['addFolder'];

export const AddFilesDocument = `
    mutation addFiles($id: String, $data: NoteInput!) {
  note {
    upsertNote(id: $id, data: $data) {
      data
      id
      parentId
      title
      containerId
    }
  }
}
    `;
export const useAddFilesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddFilesMutation, TError, AddFilesMutationVariables, TContext>) =>
    useMutation<AddFilesMutation, TError, AddFilesMutationVariables, TContext>(
      ['addFiles'],
      useAxios<AddFilesMutation, AddFilesMutationVariables>(AddFilesDocument),
      options
    );
useAddFilesMutation.getKey = () => ['addFiles'];

export const UpsertNoteDocument = `
    mutation upsertNote($id: String, $data: NoteInput!) {
  note {
    upsertNote(id: $id, data: $data) {
      data
      title
      parentId
      id
      containerId
    }
  }
}
    `;
export const useUpsertNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertNoteMutation, TError, UpsertNoteMutationVariables, TContext>) =>
    useMutation<UpsertNoteMutation, TError, UpsertNoteMutationVariables, TContext>(
      ['upsertNote'],
      useAxios<UpsertNoteMutation, UpsertNoteMutationVariables>(UpsertNoteDocument),
      options
    );
useUpsertNoteMutation.getKey = () => ['upsertNote'];

export const MakeNotePublicDocument = `
    mutation makeNotePublic($id: String!) {
  note {
    switchPublic(id: $id)
  }
}
    `;
export const useMakeNotePublicMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<MakeNotePublicMutation, TError, MakeNotePublicMutationVariables, TContext>) =>
    useMutation<MakeNotePublicMutation, TError, MakeNotePublicMutationVariables, TContext>(
      ['makeNotePublic'],
      useAxios<MakeNotePublicMutation, MakeNotePublicMutationVariables>(MakeNotePublicDocument),
      options
    );
useMakeNotePublicMutation.getKey = () => ['makeNotePublic'];

export const GetNoteFolderStructureDocument = `
    query getNoteFolderStructure($search: String) {
  note {
    listAll(search: $search) {
      id
      title
      type
      children {
        id
        title
        type
      }
    }
  }
}
    `;
export const useGetNoteFolderStructureQuery = <
      TData = GetNoteFolderStructureQuery,
      TError = unknown
    >(
      variables?: GetNoteFolderStructureQueryVariables,
      options?: UseQueryOptions<GetNoteFolderStructureQuery, TError, TData>
    ) =>
    useQuery<GetNoteFolderStructureQuery, TError, TData>(
      variables === undefined ? ['getNoteFolderStructure'] : ['getNoteFolderStructure', variables],
      useAxios<GetNoteFolderStructureQuery, GetNoteFolderStructureQueryVariables>(GetNoteFolderStructureDocument).bind(null, variables),
      options
    );
useGetNoteFolderStructureQuery.document = GetNoteFolderStructureDocument;

export const GetNoteDocument = `
    query getNote($id: String!) {
  note {
    get(id: $id) {
      id
      title
      data
    }
  }
}
    `;
export const useGetNoteQuery = <
      TData = GetNoteQuery,
      TError = unknown
    >(
      variables: GetNoteQueryVariables,
      options?: UseQueryOptions<GetNoteQuery, TError, TData>
    ) =>
    useQuery<GetNoteQuery, TError, TData>(
      ['getNote', variables],
      useAxios<GetNoteQuery, GetNoteQueryVariables>(GetNoteDocument).bind(null, variables),
      options
    );
useGetNoteQuery.document = GetNoteDocument;

export const SubscribeNoteDocument = `
    subscription subscribeNote($noteId: String!, $subscriberId: String!) {
  getNote(noteId: $noteId, subscriberId: $subscriberId) {
    containerId
    id
    parentId
    title
    data
  }
}
    `;