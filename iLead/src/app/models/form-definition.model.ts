export interface FormDefinitionField {
  label: string;
  type: {};
}

export interface ContextModel {
  company: string;
  objective: string;
}

export interface FormDefinition {
  name: string;
  fields: [FormDefinitionField];
  context: ContextModel;
  id: string;
  prompt: string;
}

export interface FormDefinitionDialogResult {
  definition: FormDefinition;
  delete?: boolean;
}

export interface FormDefinitionDialogData {
  definition: Partial<FormDefinition>;
  enableDelete: boolean;
}

export const FIRESTORE_COLLECTIONS = {
  DEFINITIONS: 'definitions',
};
