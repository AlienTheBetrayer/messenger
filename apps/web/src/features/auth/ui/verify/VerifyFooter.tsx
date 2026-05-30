import { useSelector } from "react-redux";

import { Button, CardFooter, Spinner } from "@/shared";
import { selectRouteStatus } from "@/shared/model/redux.selectors";

export const VerifyFooter = () => {
	const isLoading = useSelector(selectRouteStatus("authVerify"));

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			<Button
				type="submit"
				variant="secondary"
				className="w-full"
			>
				{isLoading && <Spinner />}
				Verify
			</Button>
		</CardFooter>
	);
};
