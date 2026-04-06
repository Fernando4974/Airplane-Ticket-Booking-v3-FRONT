export interface BookingRes{
  
id: number,
userId:number,
flightNumber:string,
ticketCount:number,
ticketList:string[],
bookingDate:string,
bookingStatus:string,
totalAmount:number
}
