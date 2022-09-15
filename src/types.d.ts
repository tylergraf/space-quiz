export declare type Name = {
  title: string
  first: string
  last: string
}
export declare type Location = {
  street: {
    number: number
    name: string
  },
  city: string
  state: string
  country: string
  postcode: string | number
  coordinates: {
    latitude: string
    longitude: string
  },
  timezone: {
    offset: string
    description: string
  }
}
export declare type Login = {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export declare type User =  {
  gender: string;
  name: Name,
  location: Location,
  email: string,
  login: Login
  dob: {
    date: string
    age: number
  },
  registered: {
    date: string
    age: number
  },
  phone: string
  cell: string
  id?: {
    name?: string
    value?: string | null
  },
  picture: {
    large: string
    medium: string
    thumbnail: string
  },
  nat: string
}
