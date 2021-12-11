import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../utils/api/axios.interceptor';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  async function cancelOrder(id) {
    try {
      const response = await api.put('/orders', {
        id,
        isCancelled: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.firstName + ' ' + row.lastName}
        </TableCell>
        <TableCell align='center'>{row.event.movieId}</TableCell>
        <TableCell align='center'>{row.event.startDate}</TableCell>
        <TableCell align='center'>{row.isPaid ? 'Tak' : 'Nie'}</TableCell>
        <TableCell align='center'>{row.isCancelled ? 'Tak' : 'Nie'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className='order_container'>
                <button className='order__button'>
                  Opłać zamówienie {row.id}
                </button>
                <button
                  className='order__button'
                  onClick={() => cancelOrder(row.id)}
                >
                  Anuluj zamówienie {row.id}
                </button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  console.log(props.orders);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Klient</TableCell>
            <TableCell align='center'>event.movieId</TableCell>
            <TableCell align='center'>Event.startDate</TableCell>
            <TableCell align='center'>Czy opłacono?</TableCell>
            <TableCell align='center'>Czy anulowano?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.map((order) => (
            <Row key={order.id} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
