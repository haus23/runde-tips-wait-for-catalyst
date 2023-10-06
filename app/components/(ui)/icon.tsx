import type { SVGProps } from 'react';
import iconFile from '~/assets/icons.svg';
import { cn } from '~/utils/misc';

const icons = ['close', 'menu', 'moon', 'sun'] as const;
type IconName = (typeof icons)[number];

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props} className={cn('h-6 w-6 inline self-center', className)}>
      <use href={`${iconFile}#${name}`} />
    </svg>
  );
}
