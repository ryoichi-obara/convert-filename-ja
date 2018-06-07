import test from 'ava';
import converter from '../index';

// controlRe
test('Convert TAB', t => t.deepEqual(converter.convert('\t'), ''));

// reservedRe
test('Convert .', t => t.deepEqual(converter.convert('.'), ''));
test('Convert ..', t => t.deepEqual(converter.convert('..'), ''));
test('Convert ...', t => t.deepEqual(converter.convert('...'), ''));

test('Convert file..txt', t => t.deepEqual(converter.convert('file..txt'), 'file..txt'));

// windowsReservedRe
test('Convert con', t => t.deepEqual(converter.convert('con'), ''));
test('Convert prn', t => t.deepEqual(converter.convert('prn'), ''));
test('Convert aux', t => t.deepEqual(converter.convert('aux'), ''));
test('Convert nul', t => t.deepEqual(converter.convert('nul'), ''));
test('Convert com0', t => t.deepEqual(converter.convert('com0'), ''));
test('Convert com9', t => t.deepEqual(converter.convert('com9'), ''));
test('Convert com10', t => t.deepEqual(converter.convert('com10'), 'com10'));
test('Convert lpt0', t => t.deepEqual(converter.convert('lpt0'), ''));
test('Convert lpt9', t => t.deepEqual(converter.convert('lpt9'), ''));
test('Convert lpt10', t => t.deepEqual(converter.convert('lpt10'), 'lpt10'));

// windowsTrailingRe
test('Convert \' a \'', t => t.deepEqual(converter.convert(' a '), 'a'));
test('Convert \' a a \'', t => t.deepEqual(converter.convert(' a a '), 'a a'));
test('Convert a.', t => t.deepEqual(converter.convert('a.'), 'a'));
test('Convert .gitignore', t => t.deepEqual(converter.convert('.gitignore'), '.gitignore'));

// illegal characters
test('Convert /', t => t.deepEqual(converter.convert('/'), '／'));
test('Convert ?', t => t.deepEqual(converter.convert('?'), '？'));
test('Convert <', t => t.deepEqual(converter.convert('<'), '＜'));
test('Convert >', t => t.deepEqual(converter.convert('>'), '＞'));
test('Convert ¥', t => t.deepEqual(converter.convert('¥'), '￥'));
test('Convert \\', t => t.deepEqual(converter.convert('\\'), '￥'));
test('Convert *', t => t.deepEqual(converter.convert('*'), '＊'));
test('Convert |', t => t.deepEqual(converter.convert('|'), '｜'));
test('Convert "', t => t.deepEqual(converter.convert('"'), '”'));
test('Convert :', t => t.deepEqual(converter.convert(':'), '：'));

test('Convert C:¥', t => t.deepEqual(converter.convert('C:¥'), 'C：￥'));
test('Convert C:\\', t => t.deepEqual(converter.convert('C:\\'), 'C：￥'));
test('Convert dir/file', t => t.deepEqual(converter.convert('dir/file'), 'dir／file'));
test('Convert filename<2018/06/08>.txt.', t => t.deepEqual(converter.convert('filename<2018/06/08>.txt.'), 'filename＜2018／06／08＞.txt'));

// truncate
test('Convert length 255', t => t.deepEqual(converter.convert('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345'), '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345'));
test('Convert length 256', t => t.deepEqual(converter.convert('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456'), '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345'));
