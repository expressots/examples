interface ILoginUserDTO {
  email: string;
  password: string;
	id: string;
}

interface ILoginUserResponseDTO {
  name: string;
  email: string;
  token: string;
  status: string;
	id: string;
}

export { ILoginUserDTO, ILoginUserResponseDTO };
