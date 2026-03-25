import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterBarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  price: string;
  setPrice: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
}

export const FilterBar = ({ isOpen, setIsOpen, price, setPrice, category, setCategory }: FilterBarProps) => {
  return (
    <section className="flex flex-wrap items-center gap-8 py-6 border-y border-secondary mb-10">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Filter By:</span>

      <div className="flex items-center space-x-2 border-b border-border pb-1">
        <Checkbox id="open-now" checked={isOpen} onCheckedChange={(checked) => setIsOpen(!!checked)} className="rounded-full border-muted-foreground" />
        <label htmlFor="open-now" className="text-sm cursor-pointer whitespace-nowrap">
          Open Now
        </label>
      </div>

      <Select value={price} onValueChange={setPrice}>
        <SelectTrigger className="w-25 border-none border-b border-border rounded-none shadow-none focus:ring-0 px-0 h-auto pb-1 text-sm">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Price</SelectItem>
          <SelectItem value="$">$</SelectItem>
          <SelectItem value="$$">$$</SelectItem>
          <SelectItem value="$$$">$$$</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-35 border-none border-b border-border rounded-none shadow-none focus:ring-0 px-0 h-auto pb-1 text-sm">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">Categories</SelectItem>
          <SelectItem value="Indonesian">Indonesian</SelectItem>
          <SelectItem value="Fast Food">Fast Food</SelectItem>
          <SelectItem value="Japanese">Japanese</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};
