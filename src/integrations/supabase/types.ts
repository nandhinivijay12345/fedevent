export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      confirmations: {
        Row: {
          accreditations: string | null
          authorised: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          board_affiliation: string
          created_at: string
          designation: string
          email: string
          founding_year: number
          id: string
          mission: string
          phone: string
          school_name: string
          school_type: string
          school_type_other: string | null
          signature_url: string | null
          staff_passes: number
          student_passes: number
          total_student_strength: number
          vision: string
          website: string | null
          your_name: string
        }
        Insert: {
          accreditations?: string | null
          authorised?: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          board_affiliation: string
          created_at?: string
          designation: string
          email: string
          founding_year: number
          id?: string
          mission: string
          phone: string
          school_name: string
          school_type: string
          school_type_other?: string | null
          signature_url?: string | null
          staff_passes: number
          student_passes: number
          total_student_strength: number
          vision: string
          website?: string | null
          your_name: string
        }
        Update: {
          accreditations?: string | null
          authorised?: boolean
          award_recipient_designation?: string
          award_recipient_name?: string
          award_recipient_phone?: string
          board_affiliation?: string
          created_at?: string
          designation?: string
          email?: string
          founding_year?: number
          id?: string
          mission?: string
          phone?: string
          school_name?: string
          school_type?: string
          school_type_other?: string | null
          signature_url?: string | null
          staff_passes?: number
          student_passes?: number
          total_student_strength?: number
          vision?: string
          website?: string | null
          your_name?: string
        }
        Relationships: []
      }
      individual_award_registrations: {
        Row: {
          authorised: boolean
          bio: string
          created_at: string
          email: string
          guest_passes: number
          id: string
          organisation: string | null
          phone: string
          role: string
          signature_url: string | null
          your_name: string
        }
        Insert: {
          authorised?: boolean
          bio: string
          created_at?: string
          email: string
          guest_passes: number
          id?: string
          organisation?: string | null
          phone: string
          role: string
          signature_url?: string | null
          your_name: string
        }
        Update: {
          authorised?: boolean
          bio?: string
          created_at?: string
          email?: string
          guest_passes?: number
          id?: string
          organisation?: string | null
          phone?: string
          role?: string
          signature_url?: string | null
          your_name?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          authorised: boolean
          city: string
          created_at: string
          designation: string
          email: string
          id: string
          link: string | null
          phone: string | null
          reason: string
          school_name: string
          your_name: string
        }
        Insert: {
          authorised?: boolean
          city: string
          created_at?: string
          designation: string
          email: string
          id?: string
          link?: string | null
          phone?: string | null
          reason: string
          school_name: string
          your_name: string
        }
        Update: {
          authorised?: boolean
          city?: string
          created_at?: string
          designation?: string
          email?: string
          id?: string
          link?: string | null
          phone?: string | null
          reason?: string
          school_name?: string
          your_name?: string
        }
        Relationships: []
      }
      participations: {
        Row: {
          city: string
          created_at: string
          email: string
          full_name: string
          guest_count: number
          id: string
          note: string | null
          organisation: string | null
          phone: string
          updates_opt_in: boolean
          visitor_type: string
          visitor_type_other: string | null
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          full_name: string
          guest_count?: number
          id?: string
          note?: string | null
          organisation?: string | null
          phone: string
          updates_opt_in?: boolean
          visitor_type: string
          visitor_type_other?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          guest_count?: number
          id?: string
          note?: string | null
          organisation?: string | null
          phone?: string
          updates_opt_in?: boolean
          visitor_type?: string
          visitor_type_other?: string | null
        }
        Relationships: []
      }
      organization_award_registrations: {
        Row: {
          accreditations: string | null
          authorised: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          created_at: string
          designation: string
          email: string
          founding_year: number
          guest_passes: number
          id: string
          industry: string
          mission: string
          organization_name: string
          organization_type: string
          organization_type_other: string | null
          phone: string
          signature_url: string | null
          team_passes: number
          total_team_strength: number
          vision: string
          website: string | null
          your_name: string
        }
        Insert: {
          accreditations?: string | null
          authorised?: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          created_at?: string
          designation: string
          email: string
          founding_year: number
          guest_passes: number
          id?: string
          industry: string
          mission: string
          organization_name: string
          organization_type: string
          organization_type_other?: string | null
          phone: string
          signature_url?: string | null
          team_passes: number
          total_team_strength: number
          vision: string
          website?: string | null
          your_name: string
        }
        Update: {
          accreditations?: string | null
          authorised?: boolean
          award_recipient_designation?: string
          award_recipient_name?: string
          award_recipient_phone?: string
          created_at?: string
          designation?: string
          email?: string
          founding_year?: number
          guest_passes?: number
          id?: string
          industry?: string
          mission?: string
          organization_name?: string
          organization_type?: string
          organization_type_other?: string | null
          phone?: string
          signature_url?: string | null
          team_passes?: number
          total_team_strength?: number
          vision?: string
          website?: string | null
          your_name?: string
        }
        Relationships: []
      }
      college_award_registrations: {
        Row: {
          accreditations: string | null
          affiliation: string
          authorised: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          created_at: string
          designation: string
          email: string
          founding_year: number
          id: string
          institution_name: string
          institution_type: string
          institution_type_other: string | null
          mission: string
          phone: string
          signature_url: string | null
          staff_passes: number
          student_passes: number
          total_student_strength: number
          vision: string
          website: string | null
          your_name: string
        }
        Insert: {
          accreditations?: string | null
          affiliation: string
          authorised?: boolean
          award_recipient_designation: string
          award_recipient_name: string
          award_recipient_phone: string
          created_at?: string
          designation: string
          email: string
          founding_year: number
          id?: string
          institution_name: string
          institution_type: string
          institution_type_other?: string | null
          mission: string
          phone: string
          signature_url?: string | null
          staff_passes: number
          student_passes: number
          total_student_strength: number
          vision: string
          website?: string | null
          your_name: string
        }
        Update: {
          accreditations?: string | null
          affiliation?: string
          authorised?: boolean
          award_recipient_designation?: string
          award_recipient_name?: string
          award_recipient_phone?: string
          created_at?: string
          designation?: string
          email?: string
          founding_year?: number
          id?: string
          institution_name?: string
          institution_type?: string
          institution_type_other?: string | null
          mission?: string
          phone?: string
          signature_url?: string | null
          staff_passes?: number
          student_passes?: number
          total_student_strength?: number
          vision?: string
          website?: string | null
          your_name?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
