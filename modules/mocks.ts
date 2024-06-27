import { HttpProblems, ZuploContext, ZuploRequest } from "@zuplo/runtime";

interface Document {
  id: string;
  label: string;
  createdOn: string;
}

interface Folder {
  id: string;
  label: string;
  createdOn: string;
  documents: Document[];
}

interface Organization {
  id: string;
  folders: Folder[];
}

const data: { organizations: Organization[] } = {
  organizations: [
    {
      id: "acme",
      folders: [
        {
          id: "general",
          label: "General",
          createdOn: "2024-06-27T13:15:54.396Z",
          documents: [
            {
              id: "welcome",
              label: "Welcome",
              createdOn: "2024-06-27T13:15:54.396Z",
            },
            {
              id: "onboarding",
              label: "Onboarding",
              createdOn: "2024-06-27T13:15:54.396Z",
            },
            {
              id: "handbook",
              label: "Employee Handbook",
              createdOn: "2024-06-27T13:15:54.396Z",
            },
          ],
        },
        {
          id: "projects",
          label: "Projects",
          createdOn: "2024-06-27T13:15:54.396Z",
          documents: [
            {
              id: "project-alpha",
              label: "Project Alpha",
              createdOn: "2024-06-27T13:15:54.396Z",
            },
            {
              id: "project-beta",
              label: "Project Beta",
              createdOn: "2024-06-27T13:15:54.396Z",
            },
          ],
        },
      ],
    },
  ],
};

function getOrg(request: ZuploRequest) {
  const orgId = request.user.data.organization;
  return data.organizations.find((o) => o.id === orgId);
}

function getFolder(org: Organization, request: ZuploRequest) {
  const folderId = request.params.folderId;
  return org.folders.find((f) => f.id === folderId);
}

function getDocument(folder: Folder, request) {
  const documentId = request.params.docId;
  return folder.documents.find((d) => d.id === documentId);
}

export async function listFoldersHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const org = getOrg(request);
  if (!org) {
    return HttpProblems.notFound(request, context);
  }

  return {
    data: org.folders.map((f) => ({ id: f.id, label: f.label, createdOn: f.createdOn })),
  };
}

export async function getFolderHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const org = getOrg(request);
  if (!org) {
    return HttpProblems.notFound(request, context);
  }

  const folder = getFolder(org, request);
  if (!folder) {
    return HttpProblems.notFound(request, context);
  }

  return { id: folder.id, label: folder.label, createdOn: folder.createdOn };
}

export async function createFolderHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const body = await request.json();
  return {
    ...body,
    createdOn: new Date().toJSON()
  };
}

export async function deleteFolderHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  return new Response(null, { status: 200 });
}

export async function listDocumentsHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const org = getOrg(request);
  if (!org) {
    return HttpProblems.notFound(request, context);
  }

  const folder = getFolder(org, request);
  if (!folder) {
    return HttpProblems.notFound(request, context);
  }

  return {
    data: folder.documents.map((d) => ({ id: d.id, label: d.label, createdOn: d.createdOn })),
  };
}

export async function getDocumentHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const org = getOrg(request);
  if (!org) {
    return HttpProblems.notFound(request, context);
  }

  const folder = getFolder(org, request);
  if (!folder) {
    return HttpProblems.notFound(request, context);
  }

  const document = getDocument(folder, request);
  if (!document) {
    return HttpProblems.notFound(request, context);
  }

  return document;
}

export async function createDocumentHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  const body = await request.json();
  return {
    ...body,
    createdOn: new Date().toJSON()
  };
}

export async function deleteDocumentHandler(
  request: ZuploRequest,
  context: ZuploContext
) {
  return new Response(null, { status: 200 });
}
