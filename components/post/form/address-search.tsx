import { getCoordinate } from "@/actions/posts.actions";
import { Input } from "@/components/ui/input";
import { PlaceType } from "@/type/post.type";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function AddressSearch({
  setSelectPositions,
}: {
  setSelectPositions: Dispatch<SetStateAction<PlaceType[] | []>>;
}) {
  const [listPlace, setListPlace] = useState<PlaceType[]>([]);

  const debounce = (func: (value: string) => void, delay: number) => {
    let timerId: NodeJS.Timeout;
    return function (...args: [string]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  async function handleDebounceSearch(value: string) {
    const response = await getCoordinate(value);
    // console.log("response", response);
    setListPlace(response);
  }

  const debouncedSearch = debounce(handleDebounceSearch, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  async function handleAddress(item: PlaceType) {
    setSelectPositions((items) => {
      if (items.some((i) => i.place_id === item.place_id)) {
        toast.error("이미 선택된 장소입니다.");
        return items;
      }
      const newItems = [...items, item];
      if (newItems.length > 3) {
        toast.error("방문장소는 최대 3개까지 선택할 수 있습니다.");
        return items;
      }
      return newItems;
    });
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4">
      <p className="text-sm text-black font-medium mb-1.5">방문장소 검색</p>
      <Input className="w-full" onChange={handleInputChange} />
      <div>
        <ul className="max-h-96 overflow-y-auto mt-2 rounded-lg shadow">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <li
                  className="border p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAddress(item)}
                >
                  <p>{item?.display_name} </p>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
