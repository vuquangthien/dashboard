import { makeStyles, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
  },
  control2: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    margin: '8px 0px',
  },
  defaultPaperDocument: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px 0px ${theme.spacing(
      4,
    )}px`,
    minHeight: `calc(100vh - 217px)`,
  },
  defaultPaper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 200px)`,
  },
  defaultPaper2: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 215px)`,
  },
  defaultPaperDetail: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 150px)`,
  },
  defaultPaperDetailApprovalRequests: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 180px)`,
  },
  defaultPaperDetailRequests: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 180px)`,
  },
  defaultPaperDetailReceiveRequests: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 180px)`,
  },
  fullPage: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
  },
  paperFullPageDetail: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 100px)`,
  },
  paperFullPageDetail2: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 124px)`,
  },
  paperFullPageDetail3: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 124px)`,
  },
  paperFullPageList: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 124px)`,
  },
  paperFullPageList2: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 124px)`,
    width: '100%',
    margin: '4px',
  },
  paperFullPageList3: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px ${theme.spacing(
      4,
    )}px ${theme.spacing(4)}px`,
    height: `calc(100vh - 186px)`,
  },
  defaultPaperSearch: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(
      0,
    )}px ${theme.spacing(4)}px`,
    // height: `calc(100vh - 244px)`,
    height: `calc(100vh - 257px)`,
  },
  treeRoot: {
    width: 500,
    height: '100%',
    flexGrow: 1,
    maxWidth: 400,
  },
  customCellHeader: {
    // border : '1px solid rgba(224, 224, 224, 1)',
    fontWeight: 'bold',
    // lineHeight:'0.5rem',
  },
  customCellHeaderLast: {
    fontWeight: 'bold',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  customCellBody: {
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  // tabs: {
  //   borderRight: `1px solid ${theme.palette.divider}`,
  //   minHeight: 'calc(100vh  - 140px)',
  //   // marginRight: 10,
  // },
  chart: { width: '100%', height: 500 },
  chartFull: { width: '100%', height: 'calc(100vh - 128px)' },

  wrapper: {
    textAlign: 'left',
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: 'flex-start',
  },
  marginTop: { marginTop: 20 },
  fontBold: { fontWeight: 550 },
  // TT - theme - "DASHBOARD : DETAIL BLOCK" - BACKGROUND - COLOR : 1
  bgColorBlockDetailBodyNumber1: {
    background: theme.configTheme.bgColorBlockDetailBodyNumber1,
  },
  bgColorBlockDetailFooterNumber1: {
    background: theme.configTheme.bgColorBlockDetailFooterNumber1,
  },
  // TT - theme - "DASHBOARD : DETAIL BLOCK" - BACKGROUND - COLOR : 2
  bgColorBlockDetailBodyNumber2: {
    background: theme.configTheme.bgColorBlockDetailBodyNumber2,
  },
  bgColorBlockDetailFooterNumber2: {
    background: theme.configTheme.bgColorBlockDetailFooterNumber2,
  },
  // TT - theme - "DASHBOARD : DETAIL BLOCK" - BACKGROUND - COLOR : 3
  bgColorBlockDetailBodyNumber3: {
    background: theme.configTheme.bgColorBlockDetailBodyNumber3,
  },
  bgColorBlockDetailFooterNumber3: {
    background: theme.configTheme.bgColorBlockDetailFooterNumber3,
  },

  // TT - theme - DASHBOARD : LOADING CHART - SPINNER - BACKGROUND COLOR:
  bgColorLoadingChartBody: {
    background: theme.configTheme.primaryBgColorLoadingChart,
  },

  // TT - theme - PANEL - CHANGE THEME : HEADER STYLE
  panelChangeThemeHeaderStyle: {
    background: theme.configTheme.panelChangeThemeBgHeaderColor,
    borderBottom: `1px solid ${
      theme.configTheme.panelChangeThemeBottomBorderHeaderColor
    }`,
  },
  // TT - theme - PANEL - CHANGE THEME : ITEM ACTIVE STYLE
  panelChangeThemeItemActiveStyle: {
    background: theme.configTheme.panelChangeThemeBgItemThemeActive,
    border: `1px solid ${
      theme.configTheme.panelChangeThemeBgItemThemeActive
    }!important`,
  },

  // TT - theme - TABLE - HEADER - ROW
  primaryBgColorHeaderTableRow: {
    background: theme.configTheme.primaryBgColorHeaderTableRow,
  },
  // TT -
  numberInBlockDetailDashboard: {
    fontSize: '2.125rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.825rem',
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.625rem',
      textAlign: 'center',
    },
  },
  // TT -
  textInBlockDetailDashboard: {
    fontSize: '0.875rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.775rem',
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.5rem',
      textAlign: 'center',
    },
  },
}));

export const StyleTab = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    maxWidth: 'inherit',
  },
  wrapper: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
    // fontWeight: 700,
  },
  textColorPrimary: {
    color: 'black',
  },
}))(Tab);

export default useStyles;
