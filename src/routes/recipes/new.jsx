import { useDispatch } from "react-redux";

export async function action({ request }) {
  const formData = await request.formData();
  const recipe = Object.fromEntries(formData);
}
