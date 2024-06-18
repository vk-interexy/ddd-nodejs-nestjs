import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserPermissions } from "src/app/user-roles/enums/user-permissions.enum";
import { JwtPermissionsGuard, RestrictRequest } from "src/app/security/guards/jwt-permissions.guard";

import { UserDetailDto } from "./dtos/user-detail.dto";
import { UserDto } from "./dtos/user.dto";
import { NewUserForm } from "./dtos/new-user.form";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({ summary: "Get user list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDto,
    isArray: true
  })
  @Get()
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.GetUsers)
  async getUsers() {
    const entities = await this.usersService.getUsers();
    const users = UserDto.fromEntities(entities);
    return users;
  }

  @ApiOperation({ summary: "Get user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDetailDto
  })
  @Get(":userId")
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.GetUserInfo)
  async getUserInfo(@Param("userId") userId: string) {
    const entity = await this.usersService.getUserInfo(userId);
    const user = UserDetailDto.fromEntity(entity);
    return user;
  }

  @ApiOperation({ summary: "Get user info" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserDetailDto
  })
  @Post()
  async addUsers(@Body() body: NewUserForm[]) {
    const [form] = body;

    const dto = NewUserForm.from(form);
    const errors = await NewUserForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ message: "errors.invalid-form.user-new", errors });
    }

    const entity = await this.usersService.addNewUser(dto);
    const user = UserDto.fromEntity(entity);
    return user;
  }
}
