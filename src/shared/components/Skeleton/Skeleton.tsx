import './Skeleton.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({ width, height, borderRadius, className }: SkeletonProps) => {
  return (
    <div 
      className={`skeleton-pulse ${className || ''}`}
      style={{ 
        width: width || '100%', 
        height: height || '1rem',
        borderRadius: borderRadius || '4px'
      }}
    />
  );
};

export default Skeleton;