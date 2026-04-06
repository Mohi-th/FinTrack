import {
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  Plus,
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Gamepad2,
  Zap,
  Heart,
  GraduationCap,
  Plane,
  ShoppingCart,
  MoreHorizontal,
  Circle,
} from 'lucide-react';

/**
 * Map of category value → Lucide icon component
 */
const CATEGORY_ICON_MAP = {
  // Income categories
  salary: Briefcase,
  freelance: Laptop,
  investments: TrendingUp,
  gifts: Gift,
  other_income: Plus,
  // Expense categories
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  transport: Car,
  entertainment: Gamepad2,
  bills: Zap,
  healthcare: Heart,
  education: GraduationCap,
  travel: Plane,
  groceries: ShoppingCart,
  other_expense: MoreHorizontal,
};

/**
 * Color palette for category icons — subtle, harmonious tones
 */
export const CATEGORY_COLOR_MAP = {
  salary: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  freelance: { bg: 'rgba(139,92,246,0.12)', color: '#8B5CF6' },
  investments: { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
  gifts: { bg: 'rgba(236,72,153,0.12)', color: '#EC4899' },
  other_income: { bg: 'rgba(100,116,139,0.12)', color: '#64748B' },
  food: { bg: 'rgba(249,115,22,0.12)', color: '#F97316' },
  shopping: { bg: 'rgba(168,85,247,0.12)', color: '#A855F7' },
  transport: { bg: 'rgba(6,182,212,0.12)', color: '#06B6D4' },
  entertainment: { bg: 'rgba(244,63,94,0.12)', color: '#F43F5E' },
  bills: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  healthcare: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  education: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  travel: { bg: 'rgba(14,165,233,0.12)', color: '#0EA5E9' },
  groceries: { bg: 'rgba(132,204,22,0.12)', color: '#84CC16' },
  other_expense: { bg: 'rgba(100,116,139,0.12)', color: '#64748B' },
};

/**
 * Get the color string for a given category value
 * @param {string} category
 * @returns {string} hex color
 */
export function getCategoryColor(category) {
  return (CATEGORY_COLOR_MAP[category] || { color: '#64748B' }).color;
}

/**
 * Renders a Lucide category icon inside a styled pill/badge.
 *
 * @param {Object} props
 * @param {string} props.category - The category value (e.g. 'food', 'salary')
 * @param {number} [props.size=18] - Icon size in px
 * @param {string} [props.className] - Additional CSS class
 */
export default function CategoryIcon({ category, size = 18, className = '' }) {
  const IconComponent = CATEGORY_ICON_MAP[category] || Circle;
  const colors = CATEGORY_COLOR_MAP[category] || { bg: 'rgba(100,116,139,0.12)', color: '#64748B' };

  return (
    <div
      className={`flex items-center justify-center rounded-lg shrink-0 transition-transform duration-200 hover:scale-110 ${className}`}
      style={{
        width: size + 16,
        height: size + 16,
        backgroundColor: colors.bg,
      }}
    >
      <IconComponent size={size} style={{ color: colors.color }} strokeWidth={2} />
    </div>
  );
}
