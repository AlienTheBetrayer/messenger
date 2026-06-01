// import { Test } from "@nestjs/testing";

// import { JwtService } from "../jwt/jwt.service";
// import { VerifyService } from "../verify/verify.service";
// import { AuthService } from "./auth.service";
// import { PASSWORD_MIN_LENGTH } from "@gravity/shared";

// /**
//  * services & mocks
//  */
// let authService: AuthService;

// const mockJwtService = {
// 	createAuthSession: jest.fn(),
// };

// const mockVerifyService = {
//   issueCode: jest.fn(),
// 	validateCode: jest.fn(),
// };

// describe("AuthService", () => {
// 	/**
// 	 * module
// 	 */
// 	beforeEach(async () => {
// 		jest.clearAllMocks();

// 		const moduleRef = await Test.createTestingModule({
// 			providers: [
// 				AuthService,

// 				{
// 					provide: JwtService,
// 					useValue: mockJwtService,
// 				},
// 				{
// 					provide: VerifyService,
// 					useValue: mockVerifyService,
// 				},
// 			],
// 		}).compile();

// 		authService = moduleRef.get<AuthService>(AuthService);
// 	});

// 	/**
// 	 * test 1: code validation
// 	 */
//   it("should generate code if no code provided", async () => {
//     mockVerifyService.issueCode.mockReturnValue("123456");

//     const result = await authService.login({
//       email: "test@email.com",
//       password: Array.from({ length: PASSWORD_MIN_LENGTH }).join("")
//     });
//   });
// });
