export function resolvePath(obj: any, path: string) {
  try {
    return path
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((acc, key) => acc && acc[key], obj);
  } catch {
    return null;
  }
}

export function buildResolvedConfig(data: any, config: any) {
  const resolvedSections: Record<string, Record<string, any>> = {};

  for (const [sectionName, fields] of Object.entries(config.sections)) {
    const resolvedFields: Record<string, any> = {};
    for (const [label, path] of Object.entries(fields as any)) {
      const value = resolvePath(data, path as string);
      resolvedFields[label] = value ?? "N/A";
    }
    resolvedSections[sectionName] = resolvedFields;
  }

  return {
    title: config.title,
    sections: resolvedSections,
  };
}
