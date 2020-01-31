const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.user) {
    throw new Error('JWT 토큰이 없습니다');
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
