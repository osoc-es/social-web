export interface Questions {
  QuestionId: number;
  FormId: number;
  QustionType: string;
  Question: string;
  description: string;
  isMandatory;
  Options: [{
    OptionId: number;
    QuestionId: number;
    OptionDescription: string;
  }];
}
