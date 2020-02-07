export const typeDefs = ["type GetChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyRide: GetNearbyRideResponse!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetNearByDrivers: GetNearByDriversResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  NearbyRideSubscription: Ride!\n  RideStatusSubscription: Ride!\n  DriverSubscription: User\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(text: String!, chatId: Int!): SendChatMessageResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(placeId: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, price: Float!, distance: String!, duration: String!): RequestRideResponse!\n  UpdateRideStatus(rideId: Int!, status: StatusOption!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FaceBookConnectResponse!\n  ReportMovement(lastOrientation: Float, lastLat: Float, lastLng: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  SignUp(firstName: String!, lastName: String!, email: String!, password: String, profilePhoto: String!, age: Int!, phoneNumber: String!, fbId: String): SignUpResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateMyProfile(firstName: String, lastName: String, email: String, password: String, profilePhoto: String, age: Int): UpdateMyProfileResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  passengerId: Int!\n  passenger: User!\n  driverId: Int!\n  driver: User!\n  createdAt: String!\n  updatedAt: String\n  ride: Ride!\n  rideId: Int\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n  user: User!\n  userId: Int!\n}\n\ntype GetNearbyRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  duration: String!\n  distance: String!\n  createdAt: String!\n  updatedAt: String\n  driver: User!\n  driverId: Int\n  passenger: User!\n  passengerId: Int!\n  chat: Chat\n  chatId: Int\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum StatusOption {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FaceBookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetNearByDriversResponse {\n  ok: Boolean!\n  error: String\n  drivers: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  createdAt: String!\n  updatedAt: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  messages: [Message]\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  fbId: String\n  places: [Place]\n  chatsAsDriver: [Chat]\n  chatsAsPassenger: [Chat]\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  createdAt: String!\n  updatedAt: String\n  verified: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyRide: GetNearbyRideResponse;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
  GetNearByDrivers: GetNearByDriversResponse;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  passengerId: number;
  passenger: User;
  driverId: number;
  driver: User;
  createdAt: string;
  updatedAt: string | null;
  ride: Ride;
  rideId: number | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  chatId: number | null;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  messages: Array<Message> | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  fbId: string | null;
  places: Array<Place> | null;
  chatsAsDriver: Array<Chat> | null;
  chatsAsPassenger: Array<Chat> | null;
}

export interface Ride {
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  duration: string;
  distance: string;
  createdAt: string;
  updatedAt: string | null;
  driver: User;
  driverId: number | null;
  passenger: User;
  passengerId: number;
  chat: Chat | null;
  chatId: number | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
  user: User;
  userId: number;
}

export interface GetMyPlacesResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetNearByDriversResponse {
  ok: boolean;
  error: string | null;
  drivers: Array<User> | null;
}

export interface Mutation {
  SendChatMessage: SendChatMessageResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  RequestRide: RequestRideResponse;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FaceBookConnectResponse;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  SignUp: SignUpResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface SendChatMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
  isFav: boolean | null;
}

export interface RequestRideMutationArgs {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: StatusOption;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ReportMovementMutationArgs {
  lastOrientation: number | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface SignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
  fbId: string | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  profilePhoto: string | null;
  age: number | null;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export type StatusOption = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FaceBookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
  NearbyRideSubscription: Ride;
  RideStatusSubscription: Ride;
  DriverSubscription: User | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  createdAt: string;
  updatedAt: string | null;
  verified: boolean;
}
