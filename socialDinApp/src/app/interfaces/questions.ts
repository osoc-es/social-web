export interface Questions {
  QuestionId: number;
  FormId: number;
  QuestionType: string;
  Question: string;
  description: string;
  isMandatory: boolean;
  Options: [{
    OptionId: number;
    QuestionId: number;
    OptionDescription: string;
  }];
}
