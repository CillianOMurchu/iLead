export interface FormDefinitionFieldModel {
  label: string;
  type: {};
}

export interface FormDefinitionModel {
  name: string;
  fields: [FormDefinitionFieldModel];
  context: string;
  id: string;
}
