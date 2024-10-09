export interface FormDefinitionField {
  label: string;
  type: {};
}

export interface FormDefinition {
  name: string;
  fields: [FormDefinitionField];
  prompt: string;
  id: string;
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

export interface PromptVariable {
  BUSINESS: 'business';
  OBJECTIVE: 'objective';
}
