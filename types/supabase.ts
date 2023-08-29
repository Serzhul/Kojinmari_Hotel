export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          endDate: string | null
          extrasPrice: number | null
          guestId: string | null
          hasBreakfast: boolean | null
          id: number
          isPaid: boolean | null
          numGuests: number | null
          numNights: number | null
          observations: string | null
          roomId: number | null
          roomPrice: number | null
          startDate: string | null
          status: string | null
          totalPrice: number | null
        }
        Insert: {
          created_at?: string
          endDate?: string | null
          extrasPrice?: number | null
          guestId?: string | null
          hasBreakfast?: boolean | null
          id?: number
          isPaid?: boolean | null
          numGuests?: number | null
          numNights?: number | null
          observations?: string | null
          roomId?: number | null
          roomPrice?: number | null
          startDate?: string | null
          status?: string | null
          totalPrice?: number | null
        }
        Update: {
          created_at?: string
          endDate?: string | null
          extrasPrice?: number | null
          guestId?: string | null
          hasBreakfast?: boolean | null
          id?: number
          isPaid?: boolean | null
          numGuests?: number | null
          numNights?: number | null
          observations?: string | null
          roomId?: number | null
          roomPrice?: number | null
          startDate?: string | null
          status?: string | null
          totalPrice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_guestId_fkey'
            columns: ['guestId']
            referencedRelation: 'guests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_roomId_fkey'
            columns: ['roomId']
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      guests: {
        Row: {
          email: string
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          email: string
          firstName?: string | null
          id: string
          lastName?: string | null
        }
        Update: {
          email?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'guests_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      rooms: {
        Row: {
          booked: boolean | null
          created_at: string
          description: string | null
          discount: number | null
          id: number
          image: string | null
          maxCapacity: number | null
          name: string | null
          regularPrice: number | null
          roomType: string | null
        }
        Insert: {
          booked?: boolean | null
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          maxCapacity?: number | null
          name?: string | null
          regularPrice?: number | null
          roomType?: string | null
        }
        Update: {
          booked?: boolean | null
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          maxCapacity?: number | null
          name?: string | null
          regularPrice?: number | null
          roomType?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          roomIds: string | null
          userId: string
        }
        Insert: {
          created_at?: string
          roomIds?: string | null
          userId: string
        }
        Update: {
          created_at?: string
          roomIds?: string | null
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
