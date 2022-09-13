import { IsOptional, MaxLength } from "class-validator";

export class CreateTaskDto {

  @MaxLength(100, {
    message: "Title too long. Maximum length is $constraint1, but actual is $value"
  })
  title: string;

  @IsOptional()
  @MaxLength(5000, {
    message: "Description too long. Maximum length is $constraint1, but actual is $value"
  })
  description: string;
}
