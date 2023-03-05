import React, { FC } from 'react'
import ReactPaginate from 'react-paginate'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { Arrow } from '@/common/components/icons'
import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants/styles'

interface PaginationProps {
  pageCount?: number
  handlePageChange: (page: number) => void
  page?: number
}

export const Pagination: FC<PaginationProps> = ({ pageCount = 0, handlePageChange, page }) => {
  const history = useHistory()

  if (pageCount < 2) {
    return null
  }
  const pageChangeAction = (value: any) => {
    history.push(`?page=${value.selected + 1}`)
    handlePageChange(value.selected + 1)
  }

  return (
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
        previousLabel={<Arrow direction="left" />}
        nextLabel={<Arrow direction="right" />}
        nextLinkClassName="pagination__link"
        previousLinkClassName="pagination__link pagination__link--previous"
        onPageChange={(value) => pageChangeAction(value)}
        forcePage={page && page - 1}
      />
    </StyledPaginateContainer>
  )
}

const StyledPaginateContainer = styled.nav`
  display: flex;
  width: fit-content;

  .pagination {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 2px;
    width: fit-content;
    align-items: center;
  }

  .pagination__link {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-width: 32px;
    height: 32px;
    padding: 6px 4px 4px;
    border: 1px solid transparent;
    border-color: ${Colors.Black[200]};
    background-color: ${Colors.White};
    border-radius: ${BorderRad.s};
    color: ${Colors.Black[900]};
    font-family: ${Fonts.Grotesk};
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    text-transform: capitalize;
    outline: none;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    transition: ${Transitions.all};
    z-index: 1;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 150%;
      height: 150%;
      border-radius: ${BorderRad.full};
      transform: translate(-150%, -50%);
      transition: ${Transitions.all};
      z-index: -1;
      pointer-events: none;
    }

    &:before {
      background-color: ${Colors.Black[50]};
    }

    &:after {
      background-color: ${Colors.Blue[50]};
    }

    &:hover,
    &:focus {
      border-color: ${Colors.Blue[100]};
      color: ${Colors.Blue[500]};

      &:before {
        transform: translate(-50%, -50%);
      }
    }

    &:active {
      transform: scale(0.96);
      border-color: ${Colors.Blue[100]};

      &:after {
        transform: translate(-50%, -50%);
      }
    }

    &.disabled {
      cursor: not-allowed;
      color: ${Colors.Black[300]};
      border-color: ${Colors.Black[200]};
      background-color: ${Colors.White};

      &:hover,
      &:focus,
      &:active {
        transform: scale(1);
        color: ${Colors.Black[300]};
        border-color: ${Colors.Black[200]};
        background-color: ${Colors.White};

        &:after,
        &:before {
          transform: translate(-150%, -50%);
        }
      }
    }

    &--active {
      border-color: ${Colors.Blue[100]};
      color: ${Colors.Blue[500]};

      &:after {
        transform: translate(-50%, -50%);
      }
    }
  }

  .previous,
  .next {
    .pagination__link {
      padding: 4px;
    }

    &.disabled {
      .pagination__link {
        cursor: not-allowed;
        color: ${Colors.Black[300]};
        border-color: ${Colors.Black[200]};
        background-color: ${Colors.White};

        &:hover,
        &:focus,
        &:active {
          transform: scale(1);
          color: ${Colors.Black[300]};
          border-color: ${Colors.Black[200]};
          background-color: ${Colors.White};

          &:after,
          &:before {
            transform: translate(-150%, -50%);
          }
        }
      }
    }
  }
`
