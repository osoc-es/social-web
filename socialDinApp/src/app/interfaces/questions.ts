export interface Questions {
  QuestionId: number;
  FormId: number;
  QustionType: string;
  Question: string;
  description: string;
  isMandatory: boolean;
  Options: [{
    OptionId: number;
    QuestionId: number;
    OptionDescription: string;
  }];
}
