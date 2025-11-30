import { IBaseResponse } from '@base/interfaces';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Empty, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

/**
 * NOTE: This component uses react-virtualized which has compatibility issues with React 19.
 * The ref handling has been patched for React 19 compatibility, but for long-term stability,
 * consider migrating to @tanstack/react-virtual (already installed).
 *
 * To migrate:
 * 1. Replace react-virtualized imports with @tanstack/react-virtual
 * 2. Use useVirtualizer hook instead of List/AutoSizer/CellMeasurer
 * 3. Update the rendering logic to use the new API
 */

interface IProps<D = any> {
  style?: React.CSSProperties;
  className?: string;
  emptyItemsPlaceholder?: string;
  query: UseInfiniteQueryResult<InfiniteData<IBaseResponse<D[]>, any>, Error>;
  children: (props: { item: D }) => React.ReactElement;
  onChangeItems?: (items: D[]) => void;
}

const InfiniteVirtualizedScroll = <D = any,>({
  style,
  className,
  emptyItemsPlaceholder,
  query,
  children,
  onChangeItems,
}: IProps<D>) => {
  const listRef = useRef(null);

  const cache = useMemo(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 72,
    });
  }, []);

  const mergeItems = useCallback(() => {
    if (!query.data?.pages) return [];
    return query.data.pages.flatMap((page) => page?.data ?? []);
  }, [query.data]);

  const items = useMemo(() => {
    const sanitizedMergeItems = mergeItems();
    onChangeItems?.(sanitizedMergeItems);
    return sanitizedMergeItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergeItems]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.recomputeGridSize();
      cache.clearAll();
    }
  }, [items, cache]);

  // React 19 compatible ref handler with improved compatibility
  const createRefHandler = useCallback((registerChild: any) => {
    return (element: HTMLElement | null) => {
      if (typeof registerChild === 'function' && element) {
        try {
          // For React 19 compatibility, create a ref object that mimics the old API
          const refObject = {
            current: element,
          };

          // Try to call registerChild with the ref object first
          registerChild(refObject);
        } catch {
          // If that fails, try with the element directly (for older versions)
          try {
            registerChild(element);
          } catch {
            // If both fail, create a no-op function to prevent errors
            // This ensures the component continues working even with ref issues
            console.warn('CellMeasurer ref registration failed, using fallback mode');
          }
        }
      }
    };
  }, []);

  return (
    <div style={{ ...style }} className={className}>
      {query.isLoading ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : items?.length ? (
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              className="designed_scrollbar"
              width={width}
              height={height}
              rowCount={items?.length + (query.isFetchingNextPage ? 1 : 0)}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              overscanRowCount={10}
              rowRenderer={({ key, index: idx, style, parent }) => {
                const isLastItem = idx === items?.length;

                if (isLastItem && query.isFetchingNextPage) {
                  return (
                    <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={idx}>
                      {({ registerChild }) => (
                        <div
                          key={key}
                          style={style}
                          ref={createRefHandler(registerChild)}
                          className="flex items-center justify-center py-2"
                        >
                          <Spin />
                        </div>
                      )}
                    </CellMeasurer>
                  );
                }

                const item = items?.[idx];

                return (
                  <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={idx}>
                    {({ registerChild }) => {
                      const childElement = children({
                        item,
                      });

                      return (
                        <div style={style} ref={createRefHandler(registerChild)}>
                          {childElement}
                        </div>
                      );
                    }}
                  </CellMeasurer>
                );
              }}
              onScroll={({ clientHeight, scrollTop, scrollHeight }) => {
                const threshold = 150;
                const shouldFetchMore = clientHeight + scrollTop >= scrollHeight - threshold;

                if (shouldFetchMore && !query.isFetchingNextPage) {
                  query.fetchNextPage();
                }
              }}
            />
          )}
        </AutoSizer>
      ) : (
        <div className="flex justify-center h-full mt-[100px]">
          <Empty description={emptyItemsPlaceholder || 'Not available'} />
        </div>
      )}
    </div>
  );
};

export default InfiniteVirtualizedScroll;
