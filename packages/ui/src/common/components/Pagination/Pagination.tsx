import React, { FC } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

import { ArrowRightIcon } from '@/common/components/icons'
import { Colors } from '@/common/constants/styles'
import { size } from '@/common/utils/styles'

interface PaginationProps {
  pageCount: number
  handlePageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ pageCount, handlePageChange }) => (
  <StyledPaginateContainer>
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      containerClassName="pagination"
      pageLinkClassName="pagination__link"
      pageClassName="page"
      activeClassName="page--active"
      activeLinkClassName="pagination__link--active"
      breakLinkClassName="pagination__link"
      nextLabel={<ArrowRightIcon />}
      previousLabel={<ArrowRightIcon />}
      nextLinkClassName="pagination__link"
      previousLinkClassName="pagination__link pagination__link--previous"
      onPageChange={(value) => handlePageChange(value.selected + 1)}
    />
  </StyledPaginateContainer>
)

const StyledPaginateContainer = styled.div`
  .pagination {
    display: flex;

    .page,
    .break,
    .previous,
    .next {
      ${size('32px')}
      border: 1px solid ${Colors.Black[200]};
      border-radius: 2px;
      margin: 0 2px;

      &--active {
        border: 1px solid ${Colors.Blue[100]};
        background-color: ${Colors.Blue[50]};
      }
    }

    &__link {
      ${size('100%')}
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${Colors.Black[900]};
      cursor: pointer;
      text-align: center;

      &--active {
        color: ${Colors.Blue[500]};
      }

      &--previous {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
`
