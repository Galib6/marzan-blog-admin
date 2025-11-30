import { IBaseResponse } from '@base/interfaces';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Empty, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

interface IProps<D = any> {
  style?: React.CSSProperties;
  className?: string;
  emptyItemsPlaceholder?: string;
  query: UseInfiniteQueryResult<InfiniteData<IBaseResponse<D[]>, any>, Error>;
  children: (props: { item: D }) => React.ReactElement;
  onChangeItems?: (items: D[]) => void;
  height?: number; // Required for @tanstack/react-virtual
}

/**
 * Modern React 19 compatible infinite virtualized scroll component
 * Uses @tanstack/react-virtual instead of react-virtualized for better compatibility
 */
const ModernInfiniteVirtualizedScroll = <D = any,>({
  style,
  className,
  emptyItemsPlaceholder,
  query,
  children,
  onChangeItems,
  height = 400, // Default height
}: IProps<D>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const mergeItems = useCallback(() => {
    if (!query.data?.pages) return [];
    return query.data.pages.flatMap((page) => page?.data ?? []);
  }, [query.data]);

  const items = useMemo(() => {
    const sanitizedMergeItems = mergeItems();
    onChangeItems?.(sanitizedMergeItems);
    return sanitizedMergeItems;
  }, [mergeItems, onChangeItems]);

  // Create virtualizer instance
  const virtualizer = useVirtualizer({
    count: items.length + (query.isFetchingNextPage ? 1 : 0),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 98, // Default item height
    overscan: 10,
  });

  // Handle infinite scroll
  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const threshold = 150;

      if (clientHeight + scrollTop >= scrollHeight - threshold) {
        if (!query.isFetchingNextPage && query.hasNextPage) {
          query.fetchNextPage();
        }
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [query]);

  return (
    <div
      ref={parentRef}
      style={{
        ...style,
        height,
        overflow: 'auto',
      }}
      className={className}
    >
      {query.isLoading ? (
        <div className="text-center py-4">
          <Spin />
        </div>
      ) : items.length ? (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const isLastItem = virtualItem.index === items.length;

            if (isLastItem && query.isFetchingNextPage) {
              return (
                <div
                  key={`loading-${virtualItem.index}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  className="flex items-center justify-center py-2"
                >
                  <Spin />
                </div>
              );
            }

            const item = items[virtualItem.index];
            const childElement = children({ item });

            return (
              <div
                key={`item-${virtualItem.index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {childElement}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center h-full mt-[100px]">
          <Empty description={emptyItemsPlaceholder || 'Not available'} />
        </div>
      )}
    </div>
  );
};

export default ModernInfiniteVirtualizedScroll;
