import {
  ZuploContext,
  ZuploRequest,
  OktaFGAAuthZInboundPolicy,
} from "@zuplo/runtime";

export async function folderEditor(
  request: ZuploRequest,
  context: ZuploContext
) {
  OktaFGAAuthZInboundPolicy.setContextChecks(context, {
    user: `user:${request.user.sub}`,
    relation: `editor`,
    object: `folder:${request.params.folderId}`,
  });

  return request;
}

export async function folderViewer(
  request: ZuploRequest,
  context: ZuploContext
) {
  OktaFGAAuthZInboundPolicy.setContextChecks(context, {
    user: `user:${request.user.sub}`,
    relation: `viewer`,
    object: `folder:${request.params.folderId}`,
  });

  return request;
}

export async function documentViewer(
  request: ZuploRequest,
  context: ZuploContext
) {
  OktaFGAAuthZInboundPolicy.setContextChecks(context, {
    user: `user:${request.user.sub}`,
    relation: `viewer`,
    object: `document:${request.params.docId}`,
  });

  return request;
}

export async function documentEditor(
  request: ZuploRequest,
  context: ZuploContext
) {
  OktaFGAAuthZInboundPolicy.setContextChecks(context, {
    user: `user:${request.user.sub}`,
    relation: `editor`,
    object: `document:${request.params.docId}`,
  });

  return request;
}

export async function orgAdmin(request: ZuploRequest, context: ZuploContext) {
  OktaFGAAuthZInboundPolicy.setContextChecks(context, {
    user: `user:${request.user.sub}`,
    relation: `admin`,
    object: `organization:${request.user.data.organization}`,
  });

  return request;
}
