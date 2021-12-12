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
import { format } from 'date-fns';

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  async function cancelOrder(id) {
    try {
      const response = await api.put('/orders', {
        id,
        isCancelled: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  {
    console.log(row);
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
          <p>{row.firstName + ' ' + row.lastName}</p>
          <p>{row.email}</p>
        </TableCell>
        <TableCell align='center'>{row.event.movie.name}</TableCell>
        <TableCell align='center'>
          <p>{format(new Date(row.event.startDate), 'yyyy-MM-dd')}</p>
          <p>{format(new Date(row.event.startDate), 'HH:mm')}</p>
        </TableCell>
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
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Klient</TableCell>
            <TableCell align='center'>Film</TableCell>
            <TableCell align='center'>Data</TableCell>
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
