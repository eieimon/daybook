export const filterParams = (
  params: Record<string, string | number | boolean | null | undefined>,
) => {
  const requestParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
  return requestParams;
};
