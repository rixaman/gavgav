// ������� ��������� ���������� ������ ����� � ��������� [lo..up]
function irand(lo, up) { return Math.floor(Math.random()*(up-lo+1)+lo); }
//���������� ������ �������
function objLenght(obj){var i=0;for (var x in obj){if(obj.hasOwnProperty(x)){i++;}}return i;}
//��������� ���������� ����� ������ � ����
function getWeekNum (day,month,year) 
{
var calStartDOW = 1; //� ���� �������� ������, � ��� ���� 0 (��), � ���� ���� 1 (��) 
if (calStartDOW == 0) day++; //���� �������� � ��� ��� :)
month++; //� JS ������ ���������� � ����!
var a = Math.floor((14-month) / 12);
var y = year + 4800 - a;
var m = month + 12 * a - 3;
var J = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y/4) - 
 Math.floor(y/100) + Math.floor(y/400) - 32045;
d4 = (((J + 31741 - (J % 7)) % 146097) % 36524) % 1461;
var L = Math.floor(d4 / 1460);
var d1 = ((d4 - L) % 365) + L;
var week = Math.floor(d1/7) + 1;
if (week<10) week='0'+week; //���������� ���� ��� ������ 1-9
return week;
}