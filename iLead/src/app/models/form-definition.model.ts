export interface FormDefinitionFieldModel {
  label: string;
  type: string;
}

export interface FormDefinitionModel {
  name: string;
  fields: [FormDefinitionFieldModel];
  context: string;
  id: string;
}
