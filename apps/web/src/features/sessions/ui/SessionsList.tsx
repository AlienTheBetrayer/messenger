import { groupSelectors } from "@/features/sessions/model/sessionGroup.api"
import { useAppSelector } from "@/shared"

export const SessionsList = () => {
  // redux
  const groupIds = useAppSelector(groupSelectors.selectIds);

  // jsx
  return (
    <ul className="w-full flex flex-col max-h-32 overflow-y-auto fade-bottom">
      {groupIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </ul>
  );
}