import { Body, Controller, Post, HttpStatus, BadRequestException, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserPermissions } from "src/app/user-roles/enums/user-permissions.enum";
import { CurrentUser, JwtPermissionsGuard, RestrictRequest } from "src/app/security/guards/jwt-permissions.guard";
import { JwtTokenDto } from "src/app/security/dtos/jwt-token.dto";
import { UserSessionDto } from "src/app/security/dtos/user-session.dto";

import { AuthService } from "src/app/auth/auth.service";
import { UserSignInForm } from "src/app/auth/dtos/user-sign-in.form";
import { ErrorCodes } from "src/shared/enums/error-codes.enum";
import { UserSignUpForm } from "./dtos/user-sign-up.form";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: "Sign in with email and password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: JwtTokenDto
  })
  @Post("sign-in")
  async signIn(@Body() body: UserSignInForm) {
    const dto = UserSignInForm.from(body);
    const errors = await UserSignInForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ message: ErrorCodes.InvalidForm, errors });
    }

    return await this.authService.signIn(dto);
  }

  @ApiOperation({ summary: "Sign up with email and password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: JwtTokenDto
  })
  @Post("sign-up")
  async signUp(@Body() body: UserSignUpForm) {
    const dto = UserSignUpForm.from(body);
    const errors = await UserSignUpForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ message: ErrorCodes.InvalidForm, errors });
    }

    return await this.authService.signUp(dto);
  }

  @ApiOperation({ summary: "Sign out" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: null
  })
  @Post("sign-out")
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.SignOut)
  async signOut(@CurrentUser() user: UserSessionDto) {
    return null;
  }
}
