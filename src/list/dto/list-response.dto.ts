export class UserResponseDto {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}

export class ListResponseDto {
  constructor(
    id: number,
    name: string,
    userDto: UserResponseDto,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = userDto;
  }
  id: number;
  name: string;
  user: UserResponseDto;
  createdAt: Date;
  updatedAt: Date;
}
