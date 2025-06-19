export const SERVER_URL = process.env.SERVER_URL;
export const APP_NAME = process.env.APP_NAME;
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
export const NO_IMG = "/images/noProfileImage.jpg";

export const CITIES = [
  "서울",
  "부산",
  "대구",
  "대전",
  "광주",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "인천",
];

export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcNX9WPQAGAgJUl8IWQgAAAABJRU5ErkJggg==";

export const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?";

export const POST_SAMPLE = [{
  id: 1,
  title: "부산 해운대에서의 하루",
  slug: "부산-해운대에서의-하루",
  content: "부산 해운대에서의 하루는 정말 특별한 경험이었습니다. 해변을 따라 산책하고, 맛있는 해산물을 먹으며, 아름다운 일몰을 감상했습니다. 해운대의 분위기는 언제나 활기차고 즐거웠습니다.",
  createdAt: "2023-10-01T12:00:00Z",
  viewCount: 150,
  users: {
    id: "user123",
    username: "travel_lover",
    url: "https://example.com/user123.jpg"
  },
  imageUrl: "https://example.com/post-image.jpg",
  districts: {
    id: 1,
    name: "해운대"
  },
  cities: {
    id: 1,
    name: "부산"
  },
  countries: {
    id: 1,
    name: "한국"
  },
}]
