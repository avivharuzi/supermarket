const BASE_URL: string = 'http://localhost:8080';

export const DEFAULT_IMAGE_PATH: string = 'assets/images/defaults/default-image.png';
export const LOADING_GIF_PATH: string = 'assets/images/tools/loading.gif';

export const IMAGES_PATH: string = `${BASE_URL}/images`;

export const REGISTER_URL: string = `${BASE_URL}/auth/register`;
export const LOGIN_URL: string = `${BASE_URL}/auth/login`;
export const CHECK_TOKEN_URL: string = `${BASE_URL}/auth/check`;

const BASE_OVERALL_URL: string = `${BASE_URL}/overall`;

export const OVERALL_PRODUCTS_URL: string = `${BASE_OVERALL_URL}/products`;
export const OVERALL_ORDERS_URL: string = `${BASE_OVERALL_URL}/orders`;

export const BASE_API_URL: string = `${BASE_URL}/api`;

export const BASE_CATEGORY_URL: string = `${BASE_API_URL}/category`;

export const BASE_PRODUCT_URL: string = `${BASE_API_URL}/product`;

export const CHECK_ROLE_OF_USER: string = `${BASE_API_URL}/user/role`;

export const NO_AUTHORIZATION_URLS: string[] = [REGISTER_URL, LOGIN_URL, CHECK_TOKEN_URL, OVERALL_PRODUCTS_URL, OVERALL_ORDERS_URL];
