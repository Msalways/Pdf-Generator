import Handlebars from "handlebars";

Handlebars.registerHelper("formatKey", (key) => {
  return key
    ? key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase())
    : "";
});

Handlebars.registerHelper("isPrimitive", (value) => {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
});

Handlebars.registerHelper("formatDate", function (timestamp) {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
});

Handlebars.registerHelper("isArray", (value) => {
  return (
    Array.isArray(value) && value.every((item) => typeof item !== "object")
  );
});

Handlebars.registerHelper("isArrayOfObjects", (value) => {
  return Array.isArray(value) && value.some((item) => typeof item === "object");
});

Handlebars.registerHelper("isObject", (value) => {
  return value && typeof value === "object" && !Array.isArray(value);
});

Handlebars.registerHelper("getKeys", (obj) => (obj ? Object.keys(obj) : []));

Handlebars.registerHelper("formatKey", (key) => {
  return key
    ? key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase())
    : "";
});

Handlebars.registerHelper("join", (arr) =>
  Array.isArray(arr) ? arr.join(", ") : ""
);

Handlebars.registerHelper("displayAny", function (value) {
  if (value === null || value === undefined) return "N/A";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return value.toString();
  if (Array.isArray(value))
    return value.length === 0 ? "[Empty Array]" : value.join(", ");
  if (typeof value === "object") return "[Object]";
  return value.toString();
});

// Recursive partial for nested objects/arrays
const objectPartial = `
<ul style="padding-left: 15px; list-style-type: disc; font-size: 12px;">
  {{#each (getKeys this) as |key|}}
    <li>
      <strong>{{formatKey key}}:</strong>
      {{#with (lookup ../this key) as |value|}}
        {{#if (isPrimitive value)}}
          {{value}}
        {{else if (isArray value)}}
          {{join value}}
        {{else if (isArrayOfObjects value)}}
          <table style="border-collapse: collapse; width: 100%; margin-top: 5px;">
            <thead>
              <tr>
                {{#each (getKeys (lookup value 0)) as |col|}}
                  <th style="border: 1px solid #ccc; padding: 4px; font-size: 11px;">{{formatKey col}}</th>
                {{/each}}
              </tr>
            </thead>
            <tbody>
              {{#each value as |item|}}
                <tr>
                  {{#each (getKeys item) as |col|}}
                    <td style="border: 1px solid #ccc; padding: 4px; font-size: 11px;">
                      {{#with (lookup item col) as |cell|}}
                        {{#if (isPrimitive cell)}}
                          {{cell}}
                        {{else if (isArray cell)}}
                          {{join cell}}
                        {{else if (isObject cell)}}
                          {{> objectPartial cell}}
                        {{else}}
                          {{displayAny cell}}
                        {{/if}}
                      {{/with}}
                    </td>
                  {{/each}}
                </tr>
              {{/each}}
            </tbody>
          </table>
        {{else if (isObject value)}}
          {{> objectPartial value}}
        {{else}}
          {{displayAny value}}
        {{/if}}
      {{/with}}
    </li>
  {{/each}}
</ul>
`;
Handlebars.registerPartial("objectPartial", objectPartial);

export { Handlebars as assesmentHandlebars };
