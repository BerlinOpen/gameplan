import type { ReactNode } from 'react';

export const ImageContainer = ({
  imageContainerClasses,
  imageShadowClasses,
  children,
}: {
  imageContainerClasses?: string;
  imageShadowClasses?: string;
  children: ReactNode;
}) => {
  return (
    <main className={`ImageHolder ${imageContainerClasses}`}>
      <div className={`ImageShadow min-h-full ${imageShadowClasses}`}>
        {children}
      </div>
    </main>
  );
};
