import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";

import { NewUserRoleForm } from "./dtos/new-user-role.form";
import { UserRoleDto } from "./dtos/user-role.dto";
import { UserRolesService } from "./user-roles.service";

@Controller("user-roles")
export class UserRolesController {
  public constructor(private readonly userRolesService: UserRolesService) { }

  @Post()
  public async addRoles(@Body() body: UserRoleDto[]) {
    const [form] = body;

    if (!form) {
      throw new BadRequestException({});
    }

    const dto = NewUserRoleForm.from(form);
    const errors = await NewUserRoleForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ errors });
    }

    const entity = await this.userRolesService.addRole(dto);

    return UserRoleDto.fromEntity(entity);
  }

  @Get()
  public async getRoles() {
    const entities = await this.userRolesService.getAllRoles();
    const roles = UserRoleDto.fromEntities(entities);
    return roles || [];
  }
}
