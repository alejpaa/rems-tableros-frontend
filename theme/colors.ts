export const appColors = {
  primary: {
    DEFAULT: '#2563EB',
    light: '#DBEAFE',
    focus: '#3B82F6',
  },
  danger: '#DC2626',
  success: '#16A34A',
  text: {
    DEFAULT: '#111827',
    title: '#1F2937',
    label: '#374151',
    body: '#4B5563',
    muted: '#6B7280',
  },
  background: {
    DEFAULT: '#F9FAFB',
    card: '#FFFFFF',
  },
  border: {
    DEFAULT: '#D1D5DB',
    light: '#E5E7EB',
  },
} as const;

export type AppColors = typeof appColors;
